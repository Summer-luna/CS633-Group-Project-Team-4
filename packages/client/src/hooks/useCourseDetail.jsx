import { axiosInstance } from '../utils/axioInstance.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth.context.jsx';

export const useCourseDetail = (courseId) => {
  const [course, setCourse] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const getCourseDetail = async () => {
      const res = await axiosInstance.get(`user/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data) {
        setCourse(res.data);
      }
    };

    if (token) {
      getCourseDetail();
    }
  }, []);

  return { course, setCourse };
};
