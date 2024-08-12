import { ajax } from './ajax'

export function login(data) {
  return ajax({
    url: '/client/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return ajax({
    url: '/api/user/info',
    method: 'get',
  })
}

export function collect() {
  return ajax({
    url: '/api/collect/books',
    method: 'get',
  })
}

export function collectTopic() {
  return ajax({
    url: '/api/collect/topic',
    method: 'get',
  })
}

export function logout() {
  return ajax({
    url: '/logout',
    method: 'post'
  })
}
