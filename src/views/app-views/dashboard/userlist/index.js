import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import IntlMessage from "components/util-components/IntlMessage";
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, HitsPerPage ,Configure, Pagination   } from 'react-instantsearch-dom';
import CustomSearchBox from './CustomSearchBox'
import CustomHits from './CustomHits'

export const ALGOLIA_ID = '7P2K0172OW';
export const ALGOLIA_SEACRCH_KEY= 'e9c3c49c82c79a7df0c47e98f702c368';
export const ALGOLIA_INDEX_NAME = "Taction_OP";
const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_SEACRCH_KEY);	

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const Userlist = () => {
	return (
	 <Row  justify="center" gutter={16}>
		<Col xs={24} sm={24} md={24} lg={24}>	
		  <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
			<CustomSearchBox />
			  <CustomHits />
			  <Configure hitsPerPage={1000}/>

		  </InstantSearch>
		</Col>		
     </Row>			
	)
}

export default Userlist
