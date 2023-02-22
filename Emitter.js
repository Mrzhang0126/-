
class Emitter {
  constructor() {
    this.events = {}
  }

  on(name, callback, ctx) {
    let handlers = this.events[name]
    if (!handlers) {
      this.events[name] = (handlers = [])
    }
    handlers.push({ fn: callback, ctx })
    return this
  }

  once(name, callback, ctx) {
    const listener = (...args) => {
      this.off(name, listener)
      callback.apply(ctx, args)
    }

    listener._ = callback
    return this.on(name, listener, ctx)
  }

  emit(name, ...args) {
    const evtArr = (this.events[name] ?? []).slice()

    for (let i = 0, len = evtArr.length; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, args)
    }

    return this
  }

  off(name, callback) {
    const evts = this.events[name]
    const liveEvents = []

    if (evts && callback) {
      for (let i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
          liveEvents.push(evts[i])
        }
      }
    }

    liveEvents.length
      ? this.events[name] = liveEvents
      : delete this.events[name]

    return this
  }
}

module.exports = Emitter;
module.exports.Emitter = Emitter;
