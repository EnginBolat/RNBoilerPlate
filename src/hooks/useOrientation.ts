import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type OrientationType = 'vertical' | 'horizontal';

const getOrientation = (): OrientationType => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'horizontal' : 'vertical';
};

const useOrientation = () => {
    const [orientation, setOrientation] = useState<OrientationType>(getOrientation());

    useEffect(() => {
        const handleChange = ({ window }: { window: ScaledSize; }) => {
            setOrientation(window.width > window.height ? 'horizontal' : 'vertical');
        };

        const subscription = Dimensions.addEventListener('change', handleChange);

        return () => { subscription.remove(); };
    }, []);


    return {
        orientation,
    };
};

export default useOrientation;
