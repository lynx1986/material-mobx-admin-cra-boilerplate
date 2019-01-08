import { createStyles } from '@material-ui/core/styles';

const styles = theme => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

export default styles;