export const transition = (propertys: string[], ) => props => props.theme.transitions.create(propertys, {
    easing: props.theme.transitions.easing.easeOut,
    duration: props.theme.transitions.duration.enteringScreen,
})