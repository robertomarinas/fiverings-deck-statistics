import React from 'react';

const CurveDiagram = () => {

	return(

		<div className="curve-container">
			<div className="curve-diagram">
				<div className="col-xs-1"></div>
				<div className="col-xs-2"><span className="cost-1"></span></div>
				<div className="col-xs-2"><span className="cost-2"></span></div>
				<div className="col-xs-2"><span className="cost-3"></span></div>
				<div className="col-xs-2"><span className="cost-4"></span></div>
				<div className="col-xs-2"><span className="cost-5"></span></div>
				<div className="col-xs-1"></div>
			</div>
			<div className="row">
				<div className="col-xs-1"></div>
				<div className="col-xs-2">1</div>
				<div className="col-xs-2">2</div>
				<div className="col-xs-2">3</div>
				<div className="col-xs-2">4</div>
				<div className="col-xs-2">5</div>
				<div className="col-xs-1"></div>
			</div>
			
		</div>
	)

}

export default CurveDiagram;
