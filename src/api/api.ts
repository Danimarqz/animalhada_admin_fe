import type { Tables, TablesInsert, TablesUpdate } from "../types/database.types";
import Security from "../utils/security";


export type Product = Tables<'product'>
export type newProduct = TablesInsert<'product'>
export type updateProduct = TablesUpdate<'product'>

type APIresponse<T> = {
    data: T
    total: number
}

const base_url = import.meta.env.BASE_PATH
const headers = {
    'Content-Type': 'application/json',
    'Origin': import.meta.env.SITE_URL,
    'X-API-KEY': import.meta.env.API_KEY
}

export async function GetProducts(page = 1, order = false): Promise<APIresponse<Product[]>> {
    let url = `${base_url}/product`
    
    const response = await fetch(pagination(url, page, order), {
        method: 'GET',
        headers: headers
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
        headers: headers
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
        headers: headers
    })
    if (!response.ok) { throw new Error (response.statusText)}
    const products: Product[] = await response.json()
    return {
        data: products,
        total: products.length
    }
}

export async function UserLogin(username: string, password: string) {
    try {
        const security = new Security();
        const data: string = JSON.stringify({ username, password });
        const dataEncrypted: string | undefined = security.encrypt(data);

        if (!dataEncrypted) {
            throw new Error('Encryption failed');
        }

        const url = `${base_url}/auth`;

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ data: dataEncrypted }),
        });

        const result = await response.json();
        if (response.ok) {
            if (result.message === 'Authenticated') {
                console.log('Login successful:', result.message);
                return { success: true, message: result.message };
            }
        } else {
            console.error('Error during login:', result);
            return { success: false, error: result.error || 'Login failed' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, error: error };
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