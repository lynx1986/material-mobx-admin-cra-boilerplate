import { createStyles } from '@material-ui/core/styles';

const styles = theme => createStyles({
  
  root: {
    flexGrow: 1
  },

  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },

  chartArea: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center'
  },

  section: {
    marginBottom: theme.spacing.unit * 2,
  },

  tabContent: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  tabChart: {
    width: '100%',
    height: 200,
  },

  rank: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
  },

  rankTop3: {
    borderRadius: theme.spacing.unit * 3,
    background: theme.palette.primary.light,
    color: theme.palette.common.white
  }
});

export default styles;