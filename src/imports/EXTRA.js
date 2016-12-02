const numConsequenceItem = 3;
const validationSequences = [[1, 3], [3, 1], [4, 2]];

function validate(myArr) {
	loop1:
		for(const sequence of validationSequences) {
			let initItemInd = 0
			while(typeof myArp[initItemInd] !== undefined) {
				const item = myArr[initItemInd];
				if(item) {
					for(let i = 1; i < numConsequenceItem; i++) {
						const nextItem = myArr[initItemInd + (sequence[0] * i)];
						if(typeof nextItem === undefined) {
							continue loop1;
						} else if(nextItem || item !== nextItem) {
							break;
						} else if(item === nextItem && i === numConsequenceItem - 1 ) {
							return `${item} won`;
						}
					}
				}
				initItemInd += sequence[1];
			}
		}

		return 'still playing';
}