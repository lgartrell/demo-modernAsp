import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './Dashboard/Dashboard';

/* wrapper for route map, sets transition animations on route change */
function RoutingTransitionWrapper(props) {
   const location = useLocation();

   return (
      <motion.div
         key={location.pathname}
         initial={{ opacity: 0, y: 0, scale: 0.99 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 0, scale: 0.99 }}
         transition={{ duration: 0.3 }}
         style={{ height: '100%' }}
      >
         <Routes location={location}>
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/*' element={<Dashboard />} />
         </Routes>
      </motion.div>
   );
}

export default RoutingTransitionWrapper;