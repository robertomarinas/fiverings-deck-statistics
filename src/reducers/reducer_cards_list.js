import React from 'react';
import { CARDS_LIST } from '../actions/index';

export default function(state = { 

	status: null, 
	statusText: '', 
	list: {}

}, action) {

	switch (action.type) {
		case CARDS_LIST:

		if(action.payload.message === "Network Error" && action.error) {
			return Object.assign({}, state, {
				status: action.payload.message,
				statusText: <p><strong>Network Error!</strong> Please make sure that you're connected to the internet.</p>
			});
		} else if(action.payload.request.status === 404) {
			return Object.assign({}, state, {
				status: action.payload.request.status,
				statusText: <p><strong>Fetch REQUEST failed!</strong> Please make sure that you are connected to the internet, have a stable connection and then try again.</p>
			});
		} else if(action.payload.request.status === 500) {
			return Object.assign({}, state, {
				status: action.payload.request.status,
				statusText: <p><strong>Server Error!</strong> API server is having an issues at the moment. Please try again later.</p>
			});
		} else if(action.payload.request.status === 200) {
			return Object.assign({}, state, {
				status: action.payload.request.status,
				statusText: <p><strong>Cards successfuly Fetched!</strong> Please enter the <strong>Permalink ID</strong> of your deck from <strong>fiveringsdb.com</strong>.</p>,
				list: action.payload.data
			});
		}

	}

	return state;

}