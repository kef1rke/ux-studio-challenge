import styles from './Spinner.module.css';

import { motion } from 'framer-motion';

interface SpinnerProps {
    width?: number;
    height?: number;
    padding?: number;
    customClass?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
    width,
    height,
    padding,
    customClass
}) => {
    return (
        <motion.div
            className={[styles.spinner, customClass || ''].join(" ")}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, loop: Infinity, ease: 'linear' }}
        >

        </motion.div>
    );
};

export default Spinner;
