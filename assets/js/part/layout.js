export let layout01, layout02, layout03, layout04
export let layouts = []
export const layoutFn = () => {
   layout01 = document.querySelector('.layout01')
   layout02 = document.querySelector('.layout02')
   layout03 = document.querySelector('.layout03')
   layout04 = document.querySelector('.layout04')
   layouts.push(layout01)
   layouts.push(layout02)
   layouts.push(layout03)
   layouts.push(layout04)
}
layoutFn()
