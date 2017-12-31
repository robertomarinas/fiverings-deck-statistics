import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCardsList, fetchDeck, fetchCardRulings } from '../actions/index';
// Components
import ImportBar from './import_bar';
import CardList from '../components/card_list';
import CurveDiagram from '../components/curve_diagram';
import ModalContent from '../components/modal_content';
import DeckList from '../components/deck_list';
import DonateBtn from '../components/donate_btn';
// Import External Files
require('font-awesome/css/font-awesome.css');
import '../../style/styles.css';

const customStyles = {
  overlay : {
    position          : 'fixed',
    zIndex            : 10,
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
  	// width				  : '200px',
  	maxWidth			  : 700,
  	maxHeight             : 900,
  	margin 				  : '0 auto',
    top                   : '12%',
    bottom                : '12%',
    left                  : '10%',
    right                 : '10%',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
			selectedID: null,
			selectedCard: null,
			optimizedCardsList: [],
			optimizedDeckList: [],
			optimizedDynastyList: [],
			optimizedConflictList: [],
			currentDynastyCount: 0,
			currentConflictCount: 0,
			curve: {
				dynasty: {
					zero: 0,
					one: 0,
					two: 0,
					three: 0,
					four: 0,
					five: 0
				},
				conflict: {
					zero: 0,
					one: 0,
					two: 0,
					three: 0,
					four: 0,
					five: 0
				}
			},
			noCost: 0,
			toggleMode: false,
			ifFetchDeck: false,
			ifFetchRuling: false,
			ifShowRuling: false,
			newRuling: ''
	    };

		// For Modal
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// Trigger modal
		this.viewItemModal = this.viewItemModal.bind(this);
		this.viewRulings = this.viewRulings.bind(this);
		// Trigger Panels
		this.togglePanel = this.togglePanel.bind(this);
		// Trigger Mode
		this.toggleSiteMode = this.toggleSiteMode.bind(this);
		// Get ALL Data
		this.onViewDeck = this.onViewDeck.bind(this);
		this.onGetCost = this.onGetCost.bind(this);
		this.onGetDeckCount = this.onGetDeckCount.bind(this);
		this.onGetAllData = this.onGetAllData.bind(this);
	}

	componentDidMount() {
		Modal.setAppElement('#root');
		this.props.fetchCardsList();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ifFetchRuling: false });
		this.setState({ newRuling: nextProps.cardRulings });
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({ selectedCard: null });
		this.setState({ modalIsOpen: false });
		this.setState({ ifShowRuling: false });
		this.setState({ newRuling: '' });
	}

	viewItemModal(e) {
		const cardId = e.target.dataset.key;

		if(cardId) {
			this.setState({ selectedCard: cardId });
			this.openModal();
		}
	}

	viewRulings(e) {
		e.preventDefault();
		const cardId = e.target.dataset.id;
		this.props.fetchCardRulings(cardId);
		this.setState({ newRuling: '' });
		this.setState({ ifFetchRuling: true });
		this.setState({ ifShowRuling: true });
	}
	// Toggle Modal Image
	viewModalImage(e) {
		e.preventDefault();
	}

	togglePanel(e) {
		e.preventDefault();
		const element = e.target;
		if(element.parentNode.parentNode.parentNode.lastChild.clientHeight === 0) {
			element.parentNode.parentNode.parentNode.lastChild.style.cssText = "height: auto";
			element.className = 'fa fa-toggle-on';
		} else {
			element.parentNode.parentNode.parentNode.lastChild.style.cssText = "height: 0; overflow: hidden; padding: 0";
			element.className = 'fa fa-toggle-off';
		}
	}
	// Toggle Site Mode
	toggleSiteMode(e) {
		e.preventDefault();
		const mode = this.state.toggleMode;
		const pageHeader = document.getElementById('page-header');
		const mainContainer = document.getElementById('main-content');
		// console.log(pageHeader.getElementsByTagName('h1')[0]);
		if(mode) {
			pageHeader.style.cssText = "background-color: #000";
			pageHeader.getElementsByTagName('h1')[0].style.cssText = "color: #fff";
			mainContainer.style.cssText = "background-color: #fff";
			this.setState({ toggleMode: false });	
		} else {
			pageHeader.style.cssText = "background-color: #fff";
			pageHeader.getElementsByTagName('h1')[0].style.cssText = "color: #000";
			mainContainer.style.cssText = "background-color: #000";
			this.setState({ toggleMode: true });
		}
		
	}

	// Display deck statistics ASYNC
	onViewDeck(e){

		const index = parseInt(e.target.dataset.index);
		const key = e.target.dataset.key;

		// Clean States
		this.setState({ currentDynastyCount: null });
		this.setState({ currentConflictCount: null });
		this.setState({ noCost: null });
		this.setState({
			curve: {
				dynasty: { zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
				conflict: { zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 }
			}
		});
		
		// set State to the selected ID
		this.setState({ selectedID: key });

		let fateCost =  [];
		let newDeckArr = [];
		
		const cardLibrary = this.props.cards.list;

		cardLibrary.records.forEach((value) => {
			fateCost[ value.id ] = { 
				clan: value.clan,
				cost: value.cost, 
				type: value.type, 
				side: value.side,
				name: value.name,
				traits: value.traits,
				text: value.text_canonical,
				image : value.pack_cards[0] ? value.pack_cards[0].image_url : '' 
			}
		});

		this.setState({optimizedCardsList: fateCost});

		let selectedDeck;
		// Check URL type (decks or strains)
		if(this.props.decks.list[index].urlType === 'strains') {
			selectedDeck = Object.entries(this.props.decks.list[index].record.head.cards);
		} else if(this.props.decks.list[index].urlType === 'decks') {
			selectedDeck = Object.entries(this.props.decks.list[index].record.cards);
		}
		
		selectedDeck.map(value => {
			newDeckArr = newDeckArr.concat({ id: value[0], count: value[1] });	
		});
		
		// Toggle Active DeckList

		this.setState({ optimizedDeckList: newDeckArr });

		// Get All of the Data
		this.onGetAllData(newDeckArr, fateCost, this.onGetCost, this.onGetDeckCount);
	}

	onGetCost(cardId, cardCount, cardsList) {

		let side;
		if(cardsList[cardId].side === 'dynasty') {
			side = 'dynasty';
		} else if(cardsList[cardId].side === 'conflict') {
			side = 'conflict';
		}

		switch (cardsList[cardId].cost) {

			case 0:
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		zero: prevState.curve[side].zero + cardCount
				    	}
				    }
				}));
			break;

			case 1: 
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		one: prevState.curve[side].one + cardCount
				    	}
				    }
				}));
				break;

			case 2: 
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		two: prevState.curve[side].two + cardCount
				    	}
				    }
				}));
				break;

			case 3: 
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		three: prevState.curve[side].three + cardCount
				    	}
				    }
				}));
				break;

			case 4: 
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		four: prevState.curve[side].four + cardCount
				    	}
				    }
				}));
				break;

			case 5: 
			case 6: 
			case 7: 
				this.setState(prevState => ({
				    curve: {
				    	...prevState.curve,
				    	[side]: {
				    		...prevState.curve[side],
				    		five: prevState.curve[side].five + cardCount
				    	}
				    }
				}));
				break;

			default:
				this.setState((prevState) => ({
					noCost: prevState.noCost + cardCount
				}));
			break;
		}

	}

	onGetDeckCount(id, count, cardsList) {

		switch (cardsList[id].side) {
			case "dynasty":
				this.setState((prevState) => ({
					currentDynastyCount: prevState.currentDynastyCount + count
				}));
			break;

			case "conflict":
				this.setState((prevState) => ({
					currentConflictCount: prevState.currentConflictCount + count
				}));
			break;
		}

	}

	onGetAllData(cardsOfDeck, allOfCards, getCostFn, getDeckCountFn) {
		cardsOfDeck.map((card) => {
			getCostFn(card.id, card.count, allOfCards);
			getDeckCountFn(card.id, card.count, allOfCards);
		});
	}

	render() {
		console.log(this.state.toggleMode);
		return (
			<div className="react-content">
		        <Modal
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		          onRequestClose={this.closeModal}
		          style={customStyles}
		          contentLabel="Example Modal"
		        >
		          <span ref={subtitle => this.subtitle = subtitle}></span>
		          <button className="btn btn-primary" onClick={this.closeModal}>close</button>
		          
		          <ModalContent ref={this.subtitle} cardId={this.state.selectedCard} cardsList={this.state.optimizedCardsList} cardRulings={this.state.newRuling} ifFetchRuling={this.state.ifFetchRuling} ifShowRuling={this.state.ifShowRuling} onViewRulings={this.viewRulings} />
		          
		        </Modal>
		        <header>
		        	<div id="page-header" className="page-header">
						<div className="container page-header-content">
							<div className="row">
								<div className="col-md-5"><h1>L5R: LCG Deck Statistics</h1></div>
								<div className="col-md-7">
									<ImportBar decks={this.props.decks} cards={this.props.cards} fetchDeck={this.props.fetchDeck} onToggleSiteMode={this.toggleSiteMode} siteMode={this.state.siteMode} />
								</div>
							</div>
						</div>
					</div>
		        </header>
		        <div id="main-content" className="main-content">
					<div className="container">
						<DeckList decks={this.props.decks} cards={this.props.cards} selectedID={this.state.selectedID} optimizedDeckList={this.state.optimizedDeckList} optimizedCardsList={this.state.optimizedCardsList} curve={this.state.curve} currentDynastyCount={this.state.currentDynastyCount} currentConflictCount={this.state.currentConflictCount} onViewItemModal={this.viewItemModal} onTogglePanel={this.togglePanel} onViewDeck={this.onViewDeck} onGetCost={this.onGetCost} onGetDeckCount={this.onGetDeckCount} onGetAllData={this.onGetAllData} />
					</div>
		        </div>
		        
				<footer>Under development by <a href="https://twitter.com/BobChu" target="_blank">@bobchu</a>. API from <a href="https://alsciende.github.io/fiveringsdb-api/" target="_blank">alsciende.github.io/fiveringsdb-api</a>
					<div className="footer-small">
						<p>This app is not affiliated or supported by fiveringsdb or Fantasy Flight Games.</p>
						<p>The source material on this app is copyrighted by Fantasy Flight Games.</p>
						<p>Legend of the Five Rings is a trademark of Fantasy Flight Games.</p>
						<div className="paypal-container"><span>You can support me by clicking</span> <DonateBtn /></div>
					</div>
				</footer>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchCardsList, fetchDeck, fetchCardRulings }, dispatch);
}
function mapStateToProps(state) {
	return {
		decks: state.decks,
		cards: state.cardsList,
		cardRulings: state.cardRulings
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);