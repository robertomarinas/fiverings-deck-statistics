import React from 'react';
import Modal from 'react-modal';

const ItemPanelModal = (props) => {

	const customStyles = {
	  content : {
	    top                   : '50%',
	    left                  : '50%',
	    right                 : 'auto',
	    bottom                : 'auto',
	    marginRight           : '-50%',
	    transform             : 'translate(-50%, -50%)'
	  }
	};

	
	return (
      <div>
        <Modal
          isOpen={props.ifOpen}
          onAfterOpen={props.onAfterOpenModal}
          onRequestClose={props.onCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2>Hello</h2>
          <button onClick={props.onCloseModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
	
}

export default ItemPanelModal;
