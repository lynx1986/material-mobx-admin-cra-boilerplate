import { createStyles } from '@material-ui/core/styles';

const styles = theme => createStyles({
  root: {
    flexGrow: 1
  },
  contentItem: {
    marginLeft: 16,
  },
  progress: {
    width: '10%',
  },
  progressTitle: {
    minWidth: 40,
    ...theme.typography.subtitle2
  }
});

export default styles;