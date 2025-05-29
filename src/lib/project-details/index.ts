import eppetsDatails from './eppets.json';
import burnLockDetails from './burnlock.json';
import inkpalDetails from './inkpal.json';
import csstyleDetails from './csstyle.json';
import shortmyDetails from './shortmy.json';

const projectDetails = {
  eppets: eppetsDatails,
  burnlock: burnLockDetails,
  inkpal: inkpalDetails,
  csstyle: csstyleDetails,
  shortmy: shortmyDetails
} as const;

export default projectDetails;