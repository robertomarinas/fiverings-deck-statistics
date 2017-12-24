import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCardsList, fetchCardInfo, fetchDeck } from '../actions/index';
// Components
import ImportBar from './import_bar';
import CardList from '../components/card_list';
import CurveDiagram from '../components/curve_diagram';
import ModalContent from '../components/modal_content';
import DeckList from '../components/deck_list';

const customStyles = {
  overlay : {
    position          : 'fixed',
    zIndex            : 9,
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '15%',
    left                  : '10%',
    right                 : '10%',
    bottom                : '15%',
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
				zero: 0,
				one: 0,
				two: 0,
				three: 0,
				four: 0,
				five: 0
			},
			noCost: 0
	    };

		// For Modal
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// Trigger modal
		this.viewItemModal = this.viewItemModal.bind(this);
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

	openModal() {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	viewItemModal(e) {

		const cardID = e.target.dataset.key;

		this.setState({
			selectedCard: cardID
		}, this.openModal());
	}

	onViewDeck(e){

		const index = parseInt(e.target.dataset.index);
		const key = e.target.dataset.key;

		// Clean States
		this.setState({ currentDynastyCount: null });
		this.setState({ currentConflictCount: null });
		this.setState({
			curve: {zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0}
		});
		
		// set State to the selected ID
		this.setState({ selectedID: key });

		let fateCost =  [];
		let newDeckArr = [];
		
		const cardLibrary = this.props.cards.list;

		// console.log(cardLibrary);

		cardLibrary.records.forEach((value) => {
			fateCost[ value.id ] = { 
				cost: value.cost, 
				type: value.type, 
				side: value.side,
				name: value.name,
				text: value.text,
				img : value.pack_cards[0] ? value.pack_cards[0].image_url : '' 
			}
		});

		this.setState({optimizedCardsList: fateCost});

		const selectedDeck = Object.entries(this.props.decks.list[index].record.head.cards);

		selectedDeck.map(value => {
			newDeckArr = newDeckArr.concat({ id: value[0], count: value[1] });	
		});
		
		// Toggle Active DeckList

		this.setState({ optimizedDeckList: newDeckArr });

		// Get All of the Data
		this.onGetAllData(newDeckArr, fateCost, this.onGetCost, this.onGetDeckCount);
	}

	onGetCost(cardId, cardCount, cardsList) {

		switch (cardsList[cardId].cost) {

			case 0:
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        zero: prevState.curve.zero + cardCount
				    }
				}));
				break;

			case 1: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        one: prevState.curve.one + cardCount
				    }
				}));
				break;

			case 2: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        two: prevState.curve.two + cardCount
				    }
				}));
				break;

			case 3: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        three: prevState.curve.three + cardCount
				    }
				}));
				break;

			case 4: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        four: prevState.curve.four + cardCount
				    }
				}));
				break;

			case 5: 
			case 6: 
			case 7: 
				this.setState(prevState => ({
				    curve: {
				        ...prevState.curve,
				        five: prevState.curve.five + cardCount
				    }
				}));
				break;

			default:
				this.setState((prevState) => ({
					noCost: prevState.noCost + cardCount
				}));

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
		return (
			<div>
		        <Modal
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		          onRequestClose={this.closeModal}
		          style={customStyles}
		          contentLabel="Example Modal"
		        >

		          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
		          <button onClick={this.closeModal}>close</button>
		          
		          <ModalContent cardId={this.state.selectedCard} cardsList={this.state.optimizedCardsList} />
		          
		        </Modal>
				<div className="page-header">
					<div className="container page-header-content">
						<div className="row">
							<div className="col-md-5"><h1>L5R: TCG Deck Statistics</h1></div>
							<div className="col-md-7">
								<ImportBar decks={this.props.decks} cards={this.props.cards} fetchDeck={this.props.fetchDeck} />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<DeckList decks={this.props.decks} cards={this.props.cards} selectedID={this.state.selectedID} optimizedDeckList={this.state.optimizedDeckList} optimizedCardsList={this.state.optimizedCardsList} curve={this.state.curve} currentDynastyCount={this.state.currentDynastyCount} currentConflictCount={this.state.currentConflictCount} onViewItemModal={this.viewItemModal} onViewDeck={this.onViewDeck} onGetCost={this.onGetCost} onGetDeckCount={this.onGetDeckCount} onGetAllData={this.onGetAllData} />
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchCardsList, fetchCardInfo, fetchDeck }, dispatch);
}
function mapStateToProps(state) {
	return {
		decks: state.decks,
		cards: state.cardsList,
		cardInfo: state.cardInfo
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);