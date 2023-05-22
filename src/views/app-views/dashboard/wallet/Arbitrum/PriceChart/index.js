import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Spin, message, Typography } from 'antd';
import axios from 'axios'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'services/AddAndABISrc_mainnet';
//import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_mainnet';
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Chart from "react-apexcharts"

import {SELECTED_NODE} from 'configs/NodeConfig';
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';


const PriceChart = ({atacPrice}) => {
	
	//const [tacPriceHistoryData, setTacPriceHistoryData] = useState(null)
	const [tacPriceHistoryDataForLine, setTacPriceHistoryDataForLine] = useState(null)
	const [tooltipValue, setTooltipValue] = useState(null)
		
	  const optionsLine = {
         series: [{
          name: 'TAC',
          data: tacPriceHistoryDataForLine
        }],
         chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom',
			  show: false
          }
        },
		 grid: {
			show: false  
		  },
        title: {
          text: 'TAC-Arbitrum',
          align: 'left'
        },
		subtitle: {
			text: tooltipValue,
			style: {
				fontSize:  '36px',
				fontWeight:  'normal',
				fontFamily:  undefined,
				color:  '#9699a2'
			  },
		},
        fill: {
          type: 'gradient',
			gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        },
        xaxis: {
          type: 'datetime',
		  tooltip: {
				enabled: false
			},
		  labels: {
		  	show: false
		  },
		  axisTicks:{
				show: false
			},
		  axisBorder: {
			show: false
		  }
        },
		 yaxis: {
			show: false,
		  }, // yaxis
        tooltip: {
          shared: false,
				y: {
				formatter: function (val) {
					setTooltipValue("$"+val.toFixed(2))
				return ("$"+val.toFixed(2))
				}
				}
        }
        };
	 
	const seriesLine = [{
	 	name: "TAC",
	 	data: tacPriceHistoryDataForLine
	 	}]
	
	
	const getATACPriceHistory = async() => {
		const APIURL = 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal'

		//https://thegraph.com/hosted-service/subgraph/ianlapham/arbitrum-minimal
		
		const tokensQuery = `
		  query {
				  tokenDayDatas(first: 30, where: {token: "0xfa51b42d4c9ea35f1758828226aaedbec50dd54e"}, orderBy: date, orderDirection: desc) {
					date
					open
					close
					high
					low
				  }
				}
			`
		
		const dataArranger = (datas) => {		
			
			//setTooltipValue( parseFloat(datas[0].close).toFixed(2)+"$")
			setTooltipValue("$"+atacPrice)
			
 			const todayPrice = {
								 x: new Date(),
							     y: atacPrice
							   }
			//get the previous datas when swapping occured
			const sortedObjForLine = datas.map(data => {
			    const tempDay =  new Date(data.date*1000)
					return(
					{
						x: tempDay,
						y: data.close
					}
					)
				})
			
			const finalArr = sortedObjForLine.unshift(todayPrice)
	    	setTacPriceHistoryDataForLine(sortedObjForLine)
		}
		
		const client = new ApolloClient({
		  uri: APIURL,
		  cache: new InMemoryCache(),
		})

		client
		  .query({
			query: gql(tokensQuery),
		  })
		  .then((data) => dataArranger(data.data.tokenDayDatas))
		  .catch((err) => {
			console.log('Error fetching data: ', err)
		  })
	}
	

	useEffect(()=>{
	 	getATACPriceHistory()
	},[atacPrice])
	
	useEffect(()=>{
		console.log(tacPriceHistoryDataForLine)
	},[tacPriceHistoryDataForLine])
	
	return(
		<>
		{tacPriceHistoryDataForLine && atacPrice &&
			<Chart
              options={optionsLine}
              series={seriesLine}
               type="line"
            />
		}
		</>
	)	
}


export default PriceChart