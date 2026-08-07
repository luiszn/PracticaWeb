document.addEventListener('DOMContentLoaded', function () {
    fetch('json/datos.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderBio(data.banda);
            renderDiscos(data.discos);
            renderCanciones(data.canciones);
            renderGaleria(data.imagenes);
            initFiltro(data.canciones);
        })
        .catch(function () {
            console.error('No se pudo cargar el archivo de datos.');
        });

    function renderBio(banda) {
        var bioTexto = document.querySelector('.bio-texto');
        bioTexto.textContent = banda.biografia;

        var miembrosGrid = document.querySelector('.miembros-grid');
        banda.miembros.forEach(function (miembro) {
            var card = document.createElement('div');
            card.className = 'miembro-card';
            card.innerHTML = '<h3>' + miembro.nombre + '</h3>' +
                '<span class="rol">' + miembro.rol + '</span>' +
                '<div class="etapa">' + miembro.etapa + '</div>';
            miembrosGrid.appendChild(card);
        });
    }

    function renderDiscos(discos) {
        var discosGrid = document.querySelector('.discos-grid');
        discos.forEach(function (disco) {
            var card = document.createElement('div');
            card.className = 'disco-card';
            card.innerHTML = '<h3>' + disco.titulo + '</h3>' +
                '<div class="disco-anio">' + disco.anio + '</div>' +
                '<div class="disco-sello">' + disco.sellos + '</div>' +
                '<p>' + disco.descripcion + '</p>';
            discosGrid.appendChild(card);
        });
    }

    function renderCanciones(canciones) {
        var cancionList = document.querySelector('.cancion-list');
        canciones.forEach(function (cancion) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = cancion.enlace;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = cancion.titulo;
            var albumSpan = document.createElement('span');
            albumSpan.className = 'cancion-album';
            albumSpan.textContent = cancion.album + ' (' + cancion.anio + ')';
            a.appendChild(albumSpan);
            li.appendChild(a);
            cancionList.appendChild(li);
        });
    }

    function renderGaleria(imagenes) {
        var galeriaGrid = document.querySelector('.galeria-grid');
        imagenes.forEach(function (img) {
            var item = document.createElement('div');
            item.className = 'galeria-item';
            var imgEl = document.createElement('img');
            imgEl.src = img.src;
            imgEl.alt = img.descripcion;
            item.appendChild(imgEl);
            galeriaGrid.appendChild(item);
        });
    }

    function initFiltro(canciones) {
        var filtroAlbum = document.getElementById('filtro-album');
        var buscarInput = document.getElementById('buscar-cancion');
        var cancionList = document.querySelector('.cancion-list');
        var albumes = [];
        canciones.forEach(function (c) {
            if (albumes.indexOf(c.album) === -1) {
                albumes.push(c.album);
            }
        });
        albumes.sort();
        albumes.forEach(function (album) {
            var option = document.createElement('option');
            option.value = album;
            option.textContent = album;
            filtroAlbum.appendChild(option);
        });

        function filtrarCanciones() {
            var textoBuscar = buscarInput.value.toLowerCase();
            var albumSeleccionado = filtroAlbum.value;
            var cancionesFiltradas = canciones.filter(function (c) {
                var coincideTexto = c.titulo.toLowerCase().indexOf(textoBuscar) !== -1;
                var coincideAlbum = albumSeleccionado === 'todos' || c.album === albumSeleccionado;
                return coincideTexto && coincideAlbum;
            });
            cancionList.innerHTML = '';
            if (cancionesFiltradas.length === 0) {
                var li = document.createElement('li');
                li.className = 'no-resultas';
                li.textContent = 'No se encontraron resultados.';
                cancionList.appendChild(li);
            } else {
                cancionesFiltradas.forEach(function (cancion) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = cancion.enlace;
                    a.target = '_blank';
                    a.rel = 'noopener';
                    a.textContent = cancion.titulo;
                    var albumSpan = document.createElement('span');
                    albumSpan.className = 'cancion-album';
                    albumSpan.textContent = cancion.album + ' (' + cancion.anio + ')';
                    a.appendChild(albumSpan);
                    li.appendChild(a);
                    cancionList.appendChild(li);
                });
            }
        }

        buscarInput.addEventListener('input', filtrarCanciones);
        filtroAlbum.addEventListener('change', filtrarCanciones);
    }
});