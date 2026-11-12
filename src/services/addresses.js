import { apiRequest } from './api.js'
import { phoneDigits } from './phone.js'

function toAddress(data) {
  return {
    id: data.addressId,
    name: data.label,
    recipient: data.recipientName,
    phone: data.recipientPhone,
    postalCode: data.postalCode,
    address: data.addressLine1,
    detail: data.addressLine2 ?? '',
    isDefault: data.isDefault,
  }
}

export async function getAddresses(signal) {
  const data = await apiRequest({ path: '/addresses', signal, authenticated: true, mock: false })
  return (Array.isArray(data) ? data : data.addresses).map(toAddress)
}

export async function saveAddress(address, id, signal) {
  const data = {
    label: address.name,
    recipientName: address.recipient,
    recipientPhone: phoneDigits(address.phone),
    postalCode: address.postalCode,
    addressLine1: address.address,
    addressLine2: address.detail,
  }
  if (id == null) data.isDefault = address.isDefault
  const saved = await apiRequest({
    path: id == null ? '/addresses' : addressPath(id),
    method: id == null ? 'POST' : 'PATCH',
    data, signal, authenticated: true, mock: false,
  })
  return toAddress(saved)
}

function addressPath(id) {
  return '/addresses/' + encodeURIComponent(id)
}

export function deleteAddress(id, signal) {
  return apiRequest({ path: addressPath(id), method: 'DELETE', signal, authenticated: true, mock: false })
}

export function setDefaultAddress(id, signal) {
  return apiRequest({ path: addressPath(id) + '/default', method: 'PATCH', signal, authenticated: true, mock: false })
}
