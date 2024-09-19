import type { Tables, TablesInsert, TablesUpdate } from "../types/database.types";


export type Product = Tables<'product'>
export type newProduct = TablesInsert<'product'>
export type updateProduct = TablesUpdate<'product'>

type APIresponse<T> = {
    data: T
    total: number
}

const base_url = import.meta.env.BASE_PATH

export async function GetProducts(page = 1, order = false): Promise<APIresponse<Product[]>> {
    let url = `${base_url}/product`
    
    const response = await fetch(pagination(url, page, order), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin': import.meta.env.SITE_URL
        }
    })
    const products: Product[] = await response.json()
    if (!response.ok) { throw new Error (response.statusText)}
    return {
        data: products,
        total: products.length
    }
}

export async function GetOne(id: number): Promise<Product> {
    const response = await fetch(`${base_url}/product/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin': import.meta.env.SITE_URL
        }
    })
    if (!response.ok) { throw new Error (response.statusText)}
    return await response.json() as Product
}

export async function GetByCategory(categories: string[], page = 1, order = false): Promise<APIresponse<Product[]>> {
    if (!categories || categories.length === 0 ) { return GetProducts() }
    const queryString: string = buildCategoryQuery(categories)
    let url = `${base_url}/product/category/?${queryString}`
    url = pagination(url, page, order)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin': import.meta.env.SITE_URL
        }
    })
    if (!response.ok) { throw new Error (response.statusText)}
    const products: Product[] = await response.json()
    return {
        data: products,
        total: products.length
    }
}

const buildCategoryQuery = (categories: string[]) => {
    return categories.map(category => `category=${encodeURIComponent(category)}`).join('&');
  };
  
const pagination = (url: string, page: number, order: boolean): string => {
    if (page != 1 || order == true) {
        url = url + `?page=${page}&order=${order}`
    }
    return url
}