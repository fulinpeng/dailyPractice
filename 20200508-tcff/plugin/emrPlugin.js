import urlMap from '@common/urlmap'
// import { TopTips } from '@tencent/bere'
import TopTips from "@emrUI/TopTips"
import { getErrorCodeMap } from '@emrConfig/errorCodeMap'
export function emrPlugin() {
    return {
        api: urlMap,
        hooks: {
            ajaxDone({ resp }, data) {
                if (resp.retcode != 0) {
                    if (resp.retcode == 7) {
                        window.top.location.href = "https://" + (window.location.host.indexOf('qcloud.com') != -1 ? "www.qcloud.com" : "cloud.tencent.com") + "/login?s_url=" + encodeURIComponent(window.top.location.href);
                    } else {
                        if (resp.errmsg) {
                            let code = /\((\d+)\)/.exec(resp.errmsg);
                            let transMsg;
                            if (code && code[1]) {
                                let ErrorCodeMap = getErrorCodeMap();
                                transMsg = ErrorCodeMap[String(code[1])];
                                if(transMsg){
                                    if(data.notifyOption != 0) {
                                        TopTips({
                                            duration: 3000,
                                            theme: 'error',
                                            message: (code[0] || "") + transMsg
                                        });
                                    }
                                    return;
                                }
                            }
                            if(data.notifyOption != 0) {
                                TopTips({
                                    duration: 3000,
                                    theme: 'error',
                                    message: resp.errmsg
                                });
                            }
                        }

                    }
                }

            }
        }
    }
}
