import dayjs from 'dayjs'

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = () => {
    //根据上次触发时间间隔
    const last = + new Date() - timestamp;

    if(last < wait && last > 0) {
      timeout = setTimeout(last, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if(!immediate) {
        result = func.apply(context, args);
        if(!timeout) context = args = null
      }
    }
  }

  return (...args) => {
    context = this;
    timestamp = + new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时时间
    if(!timeout) timeout = setTimeout(later, wait);
    if(callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result
  }
}

/**
 * 将时间撮转换成 固定格式
 * @param {String} time 时间撮
 * @param {String} type 时间格式 
 * @returns 
 */
export function filterTime(time, type) {
  const newTime = time || new Date();
  const newType = type || 'YYYY-MM-dd HH:mm:ss'
  return dayjs(newTime).format(newType)
}

const isDev = process.env.NODE_ENV === 'development'