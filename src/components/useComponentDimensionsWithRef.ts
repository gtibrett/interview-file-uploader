import {useEffect, useRef, useState} from 'react';

type ComponentDimensions = {
	width: number;
	height: number;
};

const useComponentDimensionsWithRef = (): { ref: any, dimensions: ComponentDimensions, node: HTMLElement | HTMLDivElement | null } => {
	const [dimensions, setDimensions] = useState<ComponentDimensions>({} as ComponentDimensions);
	const node                        = useRef<HTMLElement | HTMLDivElement | null>(null);
	
	const ref = (newNode: HTMLElement | HTMLDivElement | null) => {
		node.current = newNode;
	};
	
	useEffect(() => {
		if (!dimensions) {
			const handleResize = () => {
				if (node.current) {
					setDimensions(node.current.getBoundingClientRect());
				}
			};
			
			window.addEventListener('resize', handleResize);
			handleResize();
			
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);
	
	return {ref, dimensions, node: node.current};
};

export default useComponentDimensionsWithRef;
