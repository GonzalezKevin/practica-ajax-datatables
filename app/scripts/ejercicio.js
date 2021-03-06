   'use strict';
   var miTabla;
   $(document).ready(function() {
       miTabla = $('#miTabla').DataTable({
           'processing': true,
           'serverSide': true,
           'ajax': 'http://www.futbolistas.com/cargar_clinicas.php',
            'columns': [
             {'data': 'idClinica'}, 
             {'data': 'nombre'}, 
             {'data': 'razonSocial'}, 
             {'data': 'cif'}, 
             {'data': 'localidad'}, 
             {'data': 'provincia'}, 
             {'data': 'direccion'}, 
             {'data': 'numClinica'}, 
             {'data': 'idTarifa'}, 
             {'data': 'nombreTarifa'}, 
             {'data': 'idClinica',
               'render': function(data) {
                   return '<a class="btn btn-primary editarbtn" href=http://localhost/php/editar.php?id_clinica=' + data + '>Editar <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a><a class="btn btn-warning borrarbtn" href=http://localhost/php/borrar.php?id_clinica=' + data + '>Borrar  <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
               }
           }],
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           }
       });
   $('#miTabla').on('click', '.editarbtn', function(e) {
           e.preventDefault();
           $('#miTabla').fadeOut(100);
           $('#formulario').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#idClinica').val(aData.idClinica);
           $('#nombre').val(aData.nombre);
           $('#numClinica').val(aData.numClinica);
           $('#razonSocial').val(aData.razonSocial);
           $('#cif').val(aData.cif);
           $('#localidad').val(aData.localidad);
           $('#provincia option').filter(function() {
               return this.text.toLowerCase() === aData.provincia.toLowerCase();
           }).attr('selected', true);
           $('#direccion').val(aData.direccion);
           $('#cp').val(aData.cp);
       });

   $('#miTabla').on('click', '.nuevobtn', function(e) {
           e.preventDefault();
           $('#miTabla').fadeOut(100);
           $('#formulario').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#idClinica').val(aData.idClinica);
           $('#nombre').val(aData.nombre);
           $('#numClinica').val(aData.numClinica);
           $('#razonSocial').val(aData.razonSocial);
           $('#cif').val(aData.cif);
           $('#localidad').val(aData.localidad);
           $('#provincia option').filter(function() {
               return this.text.toLowerCase() === aData.provincia.toLowerCase();
           }).attr('selected', true);
           $('#direccion').val(aData.direccion);
           $('#cp').val(aData.cp);
       });

   $('#miTabla').on('click', '.borrarbtn', function(e) {
           e.preventDefault();
           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var idClinica = aData.idClinica;


           $.ajax({
               url: 'http://www.futbolistas.com/borrar_clinica.php',
               type: 'GET',
               dataType: 'json',
               data: {'id_clinica': idClinica},
           })
           .done(function(){
              var $mitablbe = $('#miTabla').dataTable({
                bRetriev:true
              });
              $mitablbe.fnDraw();
              console.log('borrado clinica');
           })
           .fail(function(){
            console.log('error en el borrado')
           });
       });

   function cargarTarifas(){
    $.ajax({
      url: 'http://www.futbolistas.com/listar_tarifas.php',
      type: 'GET',
      dataType: 'json',
      })
               .done(function(data) {
                   $('#id_tarifa').empty();
                   $.each(data, function() {
                       $('#id_tarifa').append(
                           $('<option></option>').val(this.id_tarifa).html(this.nombre)
                       );
                   });
               })
               .fail(function() {
                   console.log("Ha habido un error al obtener las tarifas");
               });
       }
    cargarTarifas();

    $('#enviar').click(function(e) {
           e.preventDefault();
          var idClinica = $('#idClinica').val();
          var nombre = $('#nombre').val();
          var localidad = $('#localidad').val();
          var provincia = $('#provincia option:selected').text();
          var direccion = $('#direccion').val();
          var cif = $('#cif').val();
          var cp = $('#cp').val();
          var id_tarifa = $('#id_tarifa').val();

           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'http://www.futbolistas.com/modificar_clinica.php',
               data: {
                   id_clinica: idClinica,
                   nombre: nombre,
                   localidad: localidad,
                   provincia: provincia,
                   direccion: direccion,
                   cp: cp,
                   id_tarifa: id_tarifa,
                   cif: cif
               },
           })
           .done(function() {
                   var $mitabla = $('#miTabla').dataTable({
                       bRetrieve: true
                   });
                   $mitabla.fnDraw();
               })
               .fail(function() {
                   console.log('error');
               })
               .always(function() {
                   $('#tabla').fadeIn(100);
                   $('#formulario').fadeOut(100);
               });
               
           $('#miTabla').fadeIn(100);
           $('#formulario').fadeOut(100);

       });
   });

