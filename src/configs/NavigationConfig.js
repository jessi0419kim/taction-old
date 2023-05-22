import { 
  DashboardOutlined, HomeOutlined, WalletOutlined, TeamOutlined, DeploymentUnitOutlined, PlusSquareOutlined, FormOutlined, FileSyncOutlined, ReconciliationOutlined, SendOutlined, ApiOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
// {
//   key: 'home',
//   path: `${APP_PREFIX_PATH}/home`,
//   title: 'home',
//   icon: DashboardOutlined,
//   breadcrumb: false,
//   submenu: []
// },
{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboard`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
	{
	  key: 'Wallet',
	  path: `${APP_PREFIX_PATH}/dashboard/wallet`,
	  title: 'sidenav.dashboard.wallet',
	  icon: WalletOutlined,
	  breadcrumb: false,
	  submenu: []
	},
	{
	  key: 'Transfer',
	  path: `${APP_PREFIX_PATH}/dashboard/Transfer`,
	  title: 'sidenav.dashboard.Transfer',
	  icon: SendOutlined,
	  breadcrumb: false,
	  submenu: []
	},	  
	  {
	  key: 'Userlist',
	  path: `${APP_PREFIX_PATH}/dashboard/userlist`,
	  title: 'sidenav.dashboard.userlist',
	  icon: TeamOutlined,
	  breadcrumb: false,
	  submenu: []
	}, 
	 {
	  key: 'Refereelist',
	  path: `${APP_PREFIX_PATH}/dashboard/refereelist`,
	  title: 'sidenav.dashboard.refereelist',
	  icon: ReconciliationOutlined,
	  breadcrumb: false,
	  submenu: []
	}, 
	//  {
	//   key: 'Bridge',
	//   path: `${APP_PREFIX_PATH}/dashboard/bridge`,
	//   title: 'sidenav.dashboard.bridge',
	//   icon: ApiOutlined,
	//   breadcrumb: false,
	//   submenu: []
	// }, 
  ]
},
	  {
  key: 'Match',
  path: `${APP_PREFIX_PATH}/match`,
  title: 'sidenav.match',
  breadcrumb: false,
  submenu: [
		  {
		  key: 'Match',
		  path: `${APP_PREFIX_PATH}/match/match_list`,
		  title: 'sidenav.match.result',
		  icon: DeploymentUnitOutlined,
		  breadcrumb: false,
		  submenu: []
		},{
		  key: 'Reporting Match',
		  path: `${APP_PREFIX_PATH}/match/reporting_match`,
		  title: 'sidenav.match.report',
		  icon: FormOutlined,
		  breadcrumb: false,
		  submenu: []
		},{
		  key: 'Match To Confirm',
		  path: `${APP_PREFIX_PATH}/match/match_to_confirm`,
		  title: 'sidenav.match.confirm',
		  icon: FileSyncOutlined,
		  breadcrumb: false,
		  submenu: []
		}]
},					
	  {
  key: 'Training',
  path: `${APP_PREFIX_PATH}/training`,
  title: 'sidenav.training',
  breadcrumb: false,
  submenu: [
		  {
		  key: 'Training List',
		  path: `${APP_PREFIX_PATH}/training/training_list`,
		  title: 'sidenav.training.result',
		  icon: DeploymentUnitOutlined,
		  breadcrumb: false,
		  submenu: []
		},
	    {
		  key: 'Reporting Training',
		  path: `${APP_PREFIX_PATH}/training/reporting_training`,
		  title: 'sidenav.training.report',
		  icon: FormOutlined,
		  breadcrumb: false,
		  submenu: []
		},
	  {
		  key: 'Training To Confirm',
		  path: `${APP_PREFIX_PATH}/training/training_to_confirm`,
		  title: 'sidenav.training.confirm',
		  icon: FileSyncOutlined,
		  breadcrumb: false,
		  submenu: []
		},
  ]
},
//   {
//   key: 'Event',
//   path: `${APP_PREFIX_PATH}/event`,
//   title: 'sidenav.event',
//   breadcrumb: false,
//   submenu: [
// 		  {
// 		  key: 'Event List',
// 		  path: `${APP_PREFIX_PATH}/event/event`,
// 		  title: 'sidenav.event.result',
// 		  icon: DeploymentUnitOutlined,
// 		  breadcrumb: false,
// 		  submenu: []
// 		},
//   ]
// },
 
						  
						 ]

const navigationConfig = [
  ...dashBoardNavTree
	]

export default navigationConfig;
