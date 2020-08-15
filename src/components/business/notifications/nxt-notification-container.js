
import { addNotification, editNotification, fetchNotifications, deleteNotification }
  from '../../../actions/company/notification-actions';
import { destroy, submit } from 'redux-form';
import { connect } from 'react-redux';
import NxtNotificationHome from './nxt-notification-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleNotificationAdd: (data) => {
      dispatch(addNotification(data));
    },
    handleNotificationUpdate: (data) => {
      dispatch(editNotification(data));
    },
    handleNotificationDelete: (id) => {
      dispatch(deleteNotification(id)).then(() => dispatch(fetchNotifications()));
    },
    handleFetchNotifications: () => {
      dispatch(fetchNotifications());
    },
    destroyNotificationForm: () => dispatch(destroy('NotificationForm')),
    handleNotificationSubmit: () => dispatch(submit('NotificationForm'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtNotificationHome);
