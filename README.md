1. Install Raspberry Pie 3.

2. Use ssh to connect to the connected ip.

3. Copy and paste the command.

-----------------------------------------------------------------------
$ sudo su -

$ wget https://github.com/zxcv1246789/ap-webui-test/archive/master.zip

$ unzip master.zip

$ chmod +x ap-webui-test-master/server/install/test.sh

$ sh ap-webui-test-master/server/install/test.sh
-----------------------------------------------------------------------

constructor() {
                this.socket = Socket('http://localhost:3000')
                this._setsocket()
        }
        requestIotServer(url) {
                logger.info('[electron Backend Connector] request Iot Back-end Server : /' + url)
                return new Promise((resolve, reject) => {
                        request.get('http://localhost:3000/' + url, (err, res, body) => {
                                if (err) {
                                        reject(err)
                                        logger.info(err)
                                } else {
                                        logger.info('[electron Backend Connector]] response Iot Back-end Server : ' + body)
                                        resolve(body)
                                }
                        })
                })
        }
        _setsocket() {
                this.socket.on('connect', function () {
                        logger.info('[electron Backend Connector] connect ok')
                })
                this.socket.on('event', function (data) {
                        logger.info('[electron Backend Connector] event Tect :' + data)
                })
                this.socket.on('BloodPressureEvent', function (data) {
                        logger.info('[electron Backend Connector] electron BloodPressureEvent on: ' + data)
                        global.mainIpcManager.bloodPressureData(data)
                })
                this.socket.on('WeightEvent', function (data) {
                        logger.info('[electron Backend Connector] WeightEvent on: ' + data)
                        global.mainIpcManager.weightData(data)
                })
                this.socket.on('temperatureEvent', function (data) {
                        logger.info('[electron Backend Connector] temperatureEvent on: ' + data)
                        global.mainIpcManager.temperatureData(data)
                })
                this.socket.on('getGalleryEvent', function (data) {
                        logger.info('[electron Backend Connector] getGalleryEvent on: ' + data)
                        global.mainIpcManager.GalleryData(data)
                })
                this.socket.on('approachEvent', function (data) {
                        logger.info('[electron Backend Connector] approachEvent on: ' + data)
                        global.mainIpcManager.approachData(data)
                })
                this.socket.on('initEvent',function (data) {
                        logger.info('[electron Backend Connector] initEvent on: ' + data)
                        global.mainIpcManager.initWeightData(data)
                })
                this.socket.on('initEventCancel',function (data) {
                        logger.info('[electron Backend Connector] initEventCancel on: ' + data)
                        global.mainIpcManager.initWeightDataCancel(data)
                })
                this.socket.on('disconnect', function () {
                        logger.info('[electron Backend Connector] disconnect ok')
                })
                this.socket.on('heightEvent', function(data){
                        global.mainIpcManager.heightEvent(data)
                })
        }
        async getBlood() {
                let body = await this.requestIotServer('bloodPressure')
                return body
        }
        async getHeight() {
                let body = await this.requestIotServer('height')
                return body
        }
        async getHeightChart() {
                let body = await this.requestIotServer('heightChart')
                return body
        }
        async getDailyHeightChart() {
                let body = await this.requestIotServer('dailyHeightChart')
                return body
        }
        async getWeight() {
                let body = await this.requestIotServer('miscale')
                return body
        }
        async getWeightChart() {
                let body = await this.requestIotServer('weightChart')
                return body
        }
        async getDailyWeightChart() {
                let body = await this.requestIotServer('dailyWeightChart')
                return body
        }
        async getCompareStandard() {
                let body = await this.requestIotServer('compareStandard')
                return body
        }
        stopRequest() {
                this.requestIotServer('stopRequest')
        }
        async faceRecog() {
                let data = await this.requestIotServer('faceRecog')
                logger.info('[electron Backend Connector]' + data)
                return data
        }
