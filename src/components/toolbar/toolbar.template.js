const btnIcons = (state) => {
  const isBold = state.fontWeight === 'bold'
  const isItalic = state.fontStyle === 'italic'
  const isUnderlined = state.textDecoration === 'underlined'

  return [
    {
      icon: 'format_align_left',
      active: state.textAlign === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: state.textAlign === 'center',
      value: {textAlign: 'center'}},
    {
      icon: 'format_align_right',
      active: state.textAlign === 'right',
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: isBold,
      value: {fontWeight: isBold ? 'normal' : 'bold'},
    },
    {
      icon: 'format_italic',
      active: isItalic,
      value: {fontStyle: isItalic ? 'normal': 'italic'},
    },
    {
      icon: 'format_underlined',
      active: isUnderlined,
      value: {textDecoration: isUnderlined ? 'none': 'underlined'},
    },
  ]
}

const toolbarButton = ({icon, active, value}) => {
  const meta = `
        data-type="button"
        data-value='${JSON.stringify(value)}'
        `
  return ` <div ${meta} class="button del ${active ? 'active' : ''}">
            <i ${meta} class="material-icons">${icon}</i>
           </div>
          `
}
export const createToolbar = (state) => {
  return btnIcons(state).map(toolbarButton).join(' ')
}
