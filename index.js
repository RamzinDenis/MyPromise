class MyPromise {
    constructor(callback) {
        const _this = this;

        this.state = 'pending';
        this.onFullfilled = [];
        this.onRejected = [];

        this.resolve = function resolve(arg) {
            _this.resolvedValue = arg;
            _this.state = 'fullfilled';

            queueMicrotask(() => {
                _this.onFullfilled.forEach(cb => {
                    if (typeof cb !== 'function') return;
                    _this.resolvedValue = cb(_this.resolvedValue);
                });
                _this.onFinnaly && _this.onFinnaly();
            });
        };

        this.reject = function reject(arg) {
            _this.rejectedValue = arg;
            _this.state = 'rejected';

            queueMicrotask(() => {
                _this.onRejected.forEach(cb => {
                    if (typeof cb !== 'function') return;
                    _this.rejectedValue = cb(_this.rejectedValue);
                });
                _this.onFinnaly && _this.onFinnaly();
            });
        };

        callback(this.resolve, this.reject);
    }

    then(cb) {
        this.onFullfilled.push(cb);
        return this;
    }

    catch(cb) {
        this.onRejected.push(cb);
        return this;
    }
    finnaly(cb) {
        this.onFinnaly = cb;
        return this;
    }
}
