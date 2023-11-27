import { useAuth } from '../../context/auth.context.jsx';
import { Students } from './professor/courseDetail.jsx';
import { CourseDetail } from './student/courseDetail.jsx';

export const CourseDetailGuard = () => {
  const { decoded_token } = useAuth();

  if (decoded_token && decoded_token.role !== 0) {
    return <Students />;
  }

  if (decoded_token && decoded_token.role === 0) {
    return <CourseDetail />;
  }
};
