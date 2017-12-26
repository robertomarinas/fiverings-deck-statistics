import React from 'react';
import CurveDiagram from './curve_diagram';

const ItemPanelCurve = (props) => {

	const arrSum = Object.values(props.curve).reduce((accu, currVal) => accu + currVal);

	if(arrSum === 0) {
		return null;
	}

	const curve = Object.values(props.curve);
	const curveTD = curve.map((cost, index) => {
		return <td key={index}>{cost}</td>
	});

	return (
		<div className="col-sm-6 col-md-12">
			<div className="item">
				<div className="panel panel-default">
				  <div className="panel-heading">
				  	<h3 className="panel-title">Fate Cost ({props.side})</h3>
				  </div>
				  <div className="panel-body">
				    <CurveDiagram data={curve} selected={props.id} />
				    <table className="table table-responsive">
				    	<thead>
				    		<tr>
				    			<th>0</th>
					    		<th>1</th>
					    		<th>2</th>
					    		<th>3</th>
					    		<th>4</th>
					    		<th>5+</th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<tr>{curveTD}</tr>
				    	</tbody>
				    </table>
				  </div>
				</div>	    		
	    	</div>
		</div>
		
	)

}

export default ItemPanelCurve;