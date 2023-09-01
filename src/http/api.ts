import {request} from './root'

export const saveComponent = async (req: {name: string; component: any}) => {
  return request.post<any>('/api/hello', req).then(r => {
    return r
  })
}

export const updateNetComponentApi = async (req: {name: string; component: any}) => {
  return request.post<any>('/api/update', req).then(r => {
    return r
  })
}

export const queryComponent = async (req: {token: string; name: string}) => {
  return request.post<any>('/api/request', req).then(r => {
    return r
  })
}

export const queryLists = async (req: {token: string}) => {
  return request.post<any>('/api/lists', {token: 'asodao_wc'}).then(r => {
    return r
  })
}
