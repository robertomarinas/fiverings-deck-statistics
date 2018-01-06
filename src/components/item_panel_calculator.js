import React from 'react';
import ValidationAlertDiv from './validation_alert_div';

const ItemPanelCalculator = (props) => {

	return (
		<div className="col-sm-6 col-md-12">
			<div className="item">
				<div className="panel panel-default">
				  <div className="panel-heading">
				  	<h2 className="panel-title">Probability Calculator:</h2>
				  </div>
				  <div className="panel-body">
				  	 
				    <form onSubmit={props.onHandleSubmit} className="prob-calc-form">
				      <ValidationAlertDiv type={props.ifEmptyFields} alertType="fail" />
						<div className="input-group">
						  <span className="input-group-addon" id="copies-addon"># of Copies:</span>
						  <input type="text" className="form-control" name="copies" onChange={props.onHandleChange} placeholder="3" value={props.copies} aria-describedby="copies-addon" />
						  
						</div>
						<ValidationAlertDiv type={props.ifCopies} alertType="fail" />
						<div className="input-group">
						  <span className="input-group-addon" id="numdraws-addon"># of Draws:</span>
						  <input type="text" className="form-control" name="numDraws" onChange={props.onHandleChange} placeholder="5" value={props.numDraws} aria-describedby="numdraws-addon" />
						</div>
						<ValidationAlertDiv type={props.ifDraws} alertType="fail" />
						<div className="input-group">
						  <span className="input-group-addon" id="decksize-addon">Deck Size:</span>
						  <input type="text" className="form-control" name="deckCount" onChange={props.onHandleChange} placeholder="40" value={props.deckCount} aria-describedby="decksize-addon" />
						</div>
						<ValidationAlertDiv type={props.ifDeckCount} alertType="fail" />
						<div className="input-group">
						  <span className="input-group-btn">
						    <button type="submit" className="btn btn-default btn-calc-res"><strong>Calculate</strong></button>
						  </span>
						</div>
						<ValidationAlertDiv type={props.calcRes} alertType="success" />
					</form>
					
				  </div>
				</div>	    		
	    	</div>
		</div>
		
	)

}

export default ItemPanelCalculator;