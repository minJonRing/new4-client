export const limitationSex = [
    { value: 0, label: '不限' },
    { value: 1, label: '男' },
    { value: 2, label: '女' },
]

export const whetherOrNot = [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
]

// 订单
const strEn = 'abcdefghijklnmopqrstuvwxyz'
const strCn = '0123456789'
const str = strEn + strCn

export const gen = (value) => {
    const num = value.split(',')
    let k = ""
    for (let i in num) {
        k += str[num[i]]
    }
    return k
}
