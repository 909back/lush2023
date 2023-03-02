export {}

declare global {
    interface Date {
        getObj: () => DateObj
        toFormat: (format?:string, options?:any) => string
    }

    interface String {
        fill: (len: number, fillStr?: string) => string
        isNumber: () => boolean
    }

    interface Number {
        fill: (len: number, fillStr?: string) => string
    }
}

interface DateObj {
    year: number,
    month: number,
    date: number,
    hour: number,
    minute: number,
    second: number,
    week: number
}

Date.prototype.getObj = function(){
    return {
        year: this.getFullYear(),
        month: this.getMonth()+1,
        date: this.getDate(),
        hour: this.getHours(),
        minute: this.getMinutes(),
        second: this.getSeconds(),
        week: this.getDay()
    }
}

Date.prototype.toFormat = function(format='YYYY-MM-DD',{ weeks=['일', '월', '화', '수', '목', '금', '토'], ap=['오전', '오후'] }={}){
    if(!this) return ''

    const {year, month, date, hour, minute, second, week} = this.getObj()

    return format.replace('YYYY', year.toString())
                 .replace('YY', year.toString().slice(2))
                 .replace('MM', (0 + month).fill(2))
                 .replace('M', (month).toString())
                 .replace('DD', (date).fill(2))
                 .replace('D', (date).toString())
                 .replace('HH', ((hour >= 12 ? 12 : 0) + hour % 12).fill(2))
                 .replace('H', ((hour >= 12 ? 12 : 0) + hour % 12).toString())
                 .replace('hh', (hour === 12 ? 12 : hour % 12).fill(2))
                 .replace('h', (hour === 12 ? 12 : hour % 12).toString())
                 .replace('mm', (minute).fill(2))
                 .replace('m', (minute).toString())
                 .replace('ss', (second).fill(2))
                 .replace('s', (second).toString())
                 .replace('W', (weeks[week] || '').toString())
                 .replace('ap', (hour >= 12 ? ap[1] : ap[0]))
}

Number.prototype.fill = function(len: number, fillStr: string='0') {
    return this.toString().fill(len, fillStr)
}

String.prototype.isNumber = () => !isNaN(Number(this))

String.prototype.fill = function(len: number, fillStr: string='0') {
    let str = this.toString()

    while(str.length < len) {
        str = fillStr + str
    }

    return str
}