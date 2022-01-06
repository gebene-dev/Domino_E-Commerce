console.log('admin conneted success')

const $ = id => document.getElementById(id);
$('table-products').innerHTML = null;

const loadProduct = async (limit,show,current,initial,next) => {
    
    try {
        let response = await fetch('http://localhost:3000/api/products');
        let result = await response.json();
        console.log(result);
        result.data.forEach(product => {
            addItem(product)
        });
        console.log()
        paginator(result.meta.total,limit,show,current,initial,next)

    } catch (error) {
        console.log(error)
    }
}

loadProduct(10,9,1,1,0)

const confirmRemove = (e,form) => {
    e.preventDefault()

    Swal.fire({
        title: '¿Seguro que deseas eliminar el producto?',
        html: `<p class="rojo">¡No podrás revertir los cambios!</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ELIMINAR',
        cancelButtonText: 'CANCELAR',
        padding: '10px 15px 50px'
    }).then((result) => {
        if (result.isConfirmed){
            form.submit();
            Swal.fire(
            'ELIMINADO!',
            'El producto ha sido eliminado',
            'success',
            )
        }
    })
}



const addItem = product => {
    let item = `
    <tr style="height: 70px;border-bottom-width: 1px;">
        <th scope="row" ><div class="d-flex justify-content-around" style="height: 70px; align-items: center;">${product.Producto.id}</div> </th>
        <td ><div class="d-flex justify-content-around" style="height: 70px; align-items: center;"><img src="/img/products/${product.nombre}" alt="" style="width: 60px; height: 60px;"></div> </td>
        <td ><div class="d-flex justify-content-around" style="height: 70px; align-items: center;">${product.Producto.nombre}</div> </td>
        <td ><div class="d-flex justify-content-around" style="height: 70px; align-items: center;">${product.Producto.precio}</div></td>
        <td class="d-flex justify-content-around" style="height: 86px; align-items: center;">
        <div>
            <a class="btn btn-sm btn-primary"
            href="/products/detail/${product.Producto.id} "><i class="fas fas fa-eye" style="color: #fff;"></i></a>
        </div>
        <div>
            <a class="btn btn-sm btn-success"
            href="/products/editProduct/${product.Producto.id} "><i class="fas fa-pencil-alt"></i></a>
        </div>   
        <div>
            <form
                action="/products/delete/${product.Producto.id}?_method=DELETE"
                method="POST" id="formDelete${product.Producto.id}">
                <button 
                    class="btn btn-sm btn-danger"
                    type='submit'
                    onclick="confirmRemove(event,document.querySelector('#formDelete${product.Producto.id}'))"
                ><i class="fas fa-trash-alt"></i></button>
            </form>
        </div>
        </td>
    </tr>
    `
    $('table-products').innerHTML += item;
}

const goPage = async (event,current,limit,initial,next) => {
    event.preventDefault();
    $('table-products').innerHTML = null;
    $('box-paginator').innerHTML = null;

    try {
        let response = await fetch(`/api/products?current=${current}&limit=${limit}`);
        let result = await response.json();
        result.data.forEach(product => {
            addItem(product)
        });
        paginator(result.meta.total,limit,9,current,initial,next)

    } catch (error) {
        console.log(error)
    }
}

goPagesNext = (event,total,limit,show,current,initial,next) => {
    event.preventDefault();
    current = current + show;
    initial = initial + show;
    next = next + show
    paginator(total,limit,show,current,initial,next)
    goPage(event,current,limit,initial,next)
}

goPageLast = (event, total, limit, show, current, initial,next) => {
    event.preventDefault()
    current = current - show
    initial = initial - show
    
    paginator(total, limit, show, current, initial)
    goPage(event, current, limit, initial,next)

}



function paginator(total, limit, show, current,initial,next){
    let pages = Math.ceil(total / limit)

    if (initial > 1){
        $('box-paginator').innerHTML = 
        `
            <li class="page-item"><a class="page-link" href="#" onclick="goPageLast(event,${total},${limit},${show},${current},${initial})"><i class="fas fa-angle-double-left"></i></a></li>
        `
    }
    
    for (let i = initial; i <= initial + show; i++) {
        if(i <= pages){
            let page = 
            ` 
            <li class="page-item ${current == i ? 'active' : ''}" onclick="goPage(event, ${i},${limit},${initial})" id="pag${i}"><a class="page-link" href="#">${i}</a></li>
            `
        $('box-paginator').innerHTML += page
        }}
    
   
    if (initial + show < pages){
        $('box-paginator').innerHTML += 
        `
            <li class="page-item"><a class="page-link" href="#" onclick="goPagesNext(event,${total},${limit},${show},${current},${initial},${next})"><i class="fas fa-angle-double-right"></i></a></li>
            
        `
    }
    
}






