import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { withRouter } from 'react-router-dom'
import SearchProductsByLine from '../components/SearchProductsByLine'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { getTypesBusiness, getProductByFilterBusiness } from '../redux/actions/product'
import SidebarProductsByBusiness from '../components/SidebarProductsByBusiness'
import Products from '../components/Products'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'

const ProductsByBusiness = ({ match }) => {

    const business_id = match.params.id
    const nameTypeBusiness = match.params.name
    const typesBusiness = useSelector(state => state.products.typesBusiness)
    const productsByFilter = useSelector(state => state.products.productsByFilter)
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState(cart.cartItems)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)
    const [lines, setLines] = useState();
    const [types, setTypes] = useState();
    const [materials, setMaterials] = useState();
    const [search, setSearch] = useState('')
    const [materialId, setMaterialId] = useState({
        ids: ''
    })
    const [lineId, setLineId] = useState({
        ids: ''
    });
    const [typeId, setTypeId] = useState({
        ids: ''
    });

    const toggleLineProductsRadio = (e, item) => {
        const { ids } = lineId;
        let newArr = [];

        if (!ids.includes(item)) {
            newArr = [...ids, item];
        } else {
            newArr = ids.filter(a => a !== item);
        }
        setLineId({
            ids: newArr
        })
    }

    const toggleTypesProductsRadio = (e, item) => {
        const { ids } = typeId;
        let newArr = [];

        if (!ids.includes(item)) {
            newArr = [...ids, item];
        } else {
            newArr = ids.filter(a => a !== item);
        }
        setTypeId({
            ids: newArr
        })
    }

    const toggleMaterialsProductsRadio = (e, item) => {
        const { ids } = materialId;
        let newArr = [];

        if (!ids.includes(item)) {
            newArr = [...ids, item];
        } else {
            newArr = ids.filter(a => a !== item);
        }
        setMaterialId({
            ids: newArr
        })
    }

    const apiGetLines = async () => {
        const response = await Axios.get(`http://3.120.185.254:8090/api/product/line/list?business=${business_id}`);
        setLines(response.data.data)
    }

    const apiGetTypes = async () => {
        const response = await Axios.get(`http://3.120.185.254:8090/api/product/types/list?business=${business_id}`);
        setTypes(response.data.data)
    }

    const apiGetMaterial = async () => {
        const response = await Axios.get(`http://3.120.185.254:8090/api/product/material/list?business=${business_id}`);
        setMaterials(response.data.data)
    }

    useEffect(() => {

        const movilOpen = document.getElementById('movil');
        const header = document.getElementById('header')
        const movilClose = document.getElementById('close-movil')

        movilOpen.addEventListener('click', function () {
            header.classList.add('movile-active')
        })

        movilClose.addEventListener('click', function () {
            header.classList.remove('movile-active')
        })

        apiGetLines();
        apiGetTypes();
        apiGetMaterial();
        apiGetLines();
        dispatch(getTypesBusiness(8, 1));
    }, [])

    useEffect(() => {
        setCartItems(cart.cartItems)
        dispatch(getProductByFilterBusiness(business_id, lineId.ids, typeId.ids, materialId.ids));
    }, [business_id, lineId.ids, typeId.ids, materialId.ids, cart.cartItems])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPostsByFilter = productsByFilter.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    let number = Object.keys(cartItems).length

    const countProductsByFilter = productsByFilter.length

    const searchPress = (e) => {
        if (e.keyCode === 13) {
            window.location.replace(`/productos/${e.target.value}`)
        }
    }

    return (
        <>
            <div className="">
            <Header number={number} />
            <SearchProductsByLine typesBusiness={typesBusiness} searchPress={searchPress} setSearch={setSearch} />

            <div className="Quotes-pm">
                <div className="Sidebar-Material_Quote">
                    <SidebarProductsByBusiness
                        lines={lines}
                        types={types}
                        materials={materials}
                        toggleTypesProductsRadio={toggleTypesProductsRadio}
                        toggleMaterialsProductsRadio={toggleMaterialsProductsRadio}
                        toggleLinesProductsRadio={toggleLineProductsRadio}
                    />
                </div>
                <div className="Products-Quote">
                    <Products
                        lines={lines}
                        types={types}
                        materials={materials}
                        toggleTypesProductsRadio={toggleTypesProductsRadio}
                        toggleMaterialsProductsRadio={toggleMaterialsProductsRadio}
                        toggleLinesProductsRadio={toggleLineProductsRadio}
                        nameTypeBusiness={nameTypeBusiness}
                        productsByFilter={currentPostsByFilter}
                        countProductsByFilter={countProductsByFilter}
                    />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPostsFilter={productsByFilter.length}
                        paginate={paginate}
                    />
                </div>
            </div>
            <Footer />
            </div>
        </>
    );
}

export default withRouter(ProductsByBusiness);