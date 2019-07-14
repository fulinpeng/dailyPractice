/*
 * @Description: Mock数据主文件
 */

import algList from './algMan/algList'
import algCreate from './algMan/algCreate'
import verCreate from './algMan/verCreate'
import verUpdate from './algMan/versionUpdate'
import verVerify from './algMan/verify'
import algStatus from './algMan/status'
import login from './login/login'
import changePass from './changePass/changePass'
import algTypeList from './algMan/algTypeList'
import algDetail from './algMan/algDetail'
import algVersionList from './algMan/algVersionList'
import imageList from './image/imageList'
import creImage from './image/creImage'
import imageDetail from './image/imageDetail'
import uploadDockerFiles from './image/uploadDockerFiles' // 镜像文件上传
import imageListNoPage from './algMan/imageListNoPage'
import algRecVersion from './algMan/algRecVersion'
import algType from './algMan/algType'
import labelList from './algMan/labelList'
import creLabel from './algMan/creLabel'
import algUpdate from './algMan/algUpdate'
import versionDetails from './algMan/versionDetails'
import labelUpdate from './algMan/labelUpdate'
import imageStatusUpdate from './algMan/imageStatusUpdate'
import algTypeStatusUpdate from './algMan/algTypeStatusUpdate'
import algLabelStatusUptade from './algMan/algLabelStatusUptade'
import algAcwTree from './template/algAcwTree'
import algAcwFuzzyTree from './template/algAcwFuzzyTree'
import templateUpdate from './template/templateUpdate'
import templateAdd from './template/templateAdd'
import templateDelete from './template/templateDelete'
import getTemplateList from './algMan/getTemplateList' // 模板管理列表分页
import getTaskList from './algMan/getTaskList' // 任务调度列表分页
import orderMoveUp from './algMan/orderMoveUp' // 上移
import orderMoveDown from './algMan/orderMoveDown' // 下移
import getTaskDetail from './algMan/getTaskDetail' // 任务调度详情
import getTaskRunnerDetail from './algMan/getTaskRunnerDetail' // 子任务右侧列表
import getTaskProgress from './algMan/getTaskProgress' // 子任务详情
import getTaskRunLog from './algMan/getTaskRunLog' // 任务日志
import getTaskParamDownload from './algMan/getTaskParamDownload' // 子任务参数下载
import getRequest from './algMan/getRequest' // 模板管理列表分页

export default {
  algList,
  algCreate,
  verCreate,
  verUpdate,
  verVerify,
  algStatus, // 算法列表修改状态
  login,
  changePass,
  algTypeList,
  algDetail,
  algVersionList,
  imageList,
  creImage,
  imageDetail,
  uploadDockerFiles,
  algRecVersion,
  algType,
  labelList,
  creLabel,
  imageListNoPage,
  algUpdate,
  versionDetails,
  labelUpdate,
  imageStatusUpdate,
  algTypeStatusUpdate,
  algLabelStatusUptade,
  algAcwTree,
  algAcwFuzzyTree,
  getTemplateList,
  getRequest,
  getTaskList,
  orderMoveUp,
  orderMoveDown,
  getTaskDetail,
  getTaskRunnerDetail,
  getTaskProgress,
  getTaskRunLog,
  templateUpdate,
  templateAdd,
  getTaskParamDownload,
  templateDelete
}
