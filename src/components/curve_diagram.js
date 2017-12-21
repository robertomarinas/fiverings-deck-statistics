import React from 'react';
import { Sparklines, SparklinesLine, SparklinesBars, SparklinesReferenceLine } from 'react-sparklines';

const CurveDiagram = (props) => {

	// if(props.selected == null) {
	// 	return null
	// }

	// console.log(props.data);

	return (

		<div className="curve-diagram">
			<Sparklines data={props.data}>
				<SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
				<SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
				<SparklinesReferenceLine type="avg" />
			</Sparklines>
		</div>
	
	)

}

export default CurveDiagram;
