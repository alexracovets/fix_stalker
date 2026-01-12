'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils'

const variants = cva('', {
  variants: {
    variant: {
      default: 'w-full',
      home_page: 'w-full h-full relative',
      home_header: cn(
        'absolute top-0 left-0 z-[1]',
        'flex flex-col justify-center items-center w-[520px] h-full bg-main-black p-[32px] gap-y-[48px]',
      ),
      home_logo_wrapper: cn('flex flex-col justify-center items-center gap-y-[2px]'),
      home_video: cn('w-full h-full object-cover relative pl-[520px]'),
      home_navigation: cn('flex flex-col justify-center items-center w-full gap-y-[24px]'),
      home_navigationElement: cn('flex justify-center items-center w-full'),
      pda_layout: cn('grid grid-rows-[auto_1fr_auto] h-full bg-pda-bg'),
      pda_header: cn('relative border-main-border border-y-[.1rem]'),
      internet_wrapper: cn('w-[17.4rem] flex justify-center items-center gap-x-[.8rem]'),
      internet_signal_wrapper: cn(
        'relative w-[1.4rem] h-[1.4rem] flex justify-center items-end gap-x-[.1rem]',
      ),
      internet_signal: cn(
        'w-[0.25rem] bg-[#A8A3A0] transition-all ease-in-out duration-500 delay-0',
      ),
      timer_wrapper: cn('w-[9.9rem] flex justify-center items-center gap-x-[.8rem]'),
      pda_navigation_wrapper: cn(
        'relative flex justify-center items-center bg-hood-black gap-x-[2.8rem] z-[1]',
      ),
      pda_navigation_link_wrapper: cn('h-full relative'),
      pda_navigation: cn('flex justify-center items-center gap-x-[8rem]'),
      navigation_selection_wrapper: cn('absolute top-0 z-[-1] select-none pointer-events-none'),
      pda_footer: cn(
        'w-full flex justify-start items-center gap-x-[27.8rem] p-[2rem] bg-hood-footer relative',
      ),
      footer_destructive_arrows: cn('flex justify-center items-center gap-x-[12rem]'),
      content_wrapper: cn(
        'grid grid-cols-[auto_1fr] h-full w-full relative overflow-hidden pr-[0.9rem] pl-[0.9rem] pt-[1rem]',
      ),
      aside_wrapper: cn('w-[52.2rem] max-w-[522px] min-w-[505px] h-full relative pr-[.8rem]'),
      main_wrapper: cn('w-full h-full'),
      content: cn('w-full h-auto p-[32px] flex flex-col gap-y-[48px] min-w-fit'),
      content_element: cn('w-full h-auto p-[32px] flex flex-col gap-y-[12px]'),
      content_header: cn('grid grid-cols-[1fr_auto] w-full gap-x-[48px]'),
      content_suits_wrapper: cn('grid grid-cols-[auto_388px] items-start w-full gap-x-[10rem]'),
      content_suits_wrapper_left: cn('w-full flex flex-col gap-y-[48px]'),
      content_suits_wrapper_right: cn(
        'w-full flex flex-col justify-center items-center gap-y-[56px]',
      ),
      content_top_wrapper: cn('flex flex-col w-full gap-y-[12px]'),
      content_top_title: cn('flex flex-col w-full gap-y-[2px]'),
      view_switch: cn('flex items-center justify-center rounded-[4px] overflow-hidden h-fit'),
      category_icon_wrapper: cn('relative w-[56px] h-[56px]'),
      defense_aside_icon: cn(
        'relative flex justify-center items-center w-[85px] h-[50px] rounded-[4px] bg-switch-bg-active overflow-hidden cursor-pointer',
        'data-[active=true]:bg-main-destructive-bg hover:bg-main-destructive-bg',
        'transition-all ease-in-out duration-300',
      ),
      weapons_aside_icon: cn(
        'relative flex justify-center items-center w-[50px] h-[50px] rounded-[4px] bg-switch-bg-active overflow-hidden cursor-pointer',
        'data-[active=true]:bg-main-destructive-bg hover:bg-main-destructive-bg',
        'transition-all ease-in-out duration-300',
      ),
      zone_aside_icon: cn(
        'relative flex justify-center items-center w-[62px] h-[50px] rounded-[4px] bg-switch-bg-active overflow-hidden cursor-pointer',
        'data-[active=true]:bg-main-destructive-bg hover:bg-main-destructive-bg',
        'transition-all ease-in-out duration-300',
      ),
      list_grid_wrapper: cn('flex flex-col gap-x-[80px] gap-y-[48px]'),
      list_grid_item: cn('flex flex-col gap-y-[32px] w-full'),
      list_grid_item_showcase: cn('flex flex-wrap gap-x-[80px] gap-y-[32px]'),
      rich_text_wrapper: cn('flex flex-col gap-y-[16px] w-full'),
      resistance_list: cn('flex flex-col w-full'),
      resistance_item: cn(
        'w-full grid grid-cols-[180px_66px_1fr] flex-start border-collapse',
        'translate-y-[-1px] first:translate-y-0',
      ),
      resistance_item_indicator: cn(
        'flex justify-start items-center gap-x-[8px] px-[12px] py-[8px] bg-accordion-bg border-[1px] border-main-border',
      ),
      resistance_item_value: cn(
        'px-[22px] py-[12px] flex justify-center items-center border-[1px] border-main-border',
      ),
      resistance_item_dashfields: cn(
        'w-full h-full flex justify-center items-center px-[12px] py-[19px] border-[1px] border-main-border',
      ),
      resistance_item_dashfields_inner: cn(
        'w-full h-[10px] bg-list-bg outline outline-black-border outline-1 relative',
      ),
      resistance_item_dashfields_dash: cn('absolute top-0 left-0 h-full bg-main-yellow-dash'),
      resistance_item_dashfields_dash_separator: cn('absolute top-0 w-[1px] h-full bg-[#100F0E]'),
      details_list: cn('flex flex-col w-full'),
      details_item: cn('w-full grid grid-cols-[240px_1fr] border-collapse'),
      details_item_pistol: cn('w-full grid grid-cols-[180px_1fr] border-collapse'),
      details_item_granade: cn('w-full grid grid-cols-[180px_1fr] border-collapse max-w-[388px]'),
      details_item_indicator: cn(
        'flex justify-start items-center gap-x-[8px] px-[12px] py-[6px] bg-accordion-bg border-[1px] border-main-border',
      ),
      details_item_value: cn(
        'px-[12px] py-[10px] text-center flex justify-center items-center border-[1px] border-main-border',
      ),
      object_effects_list: cn('flex flex-col w-full gap-y-[16px]'),
      object_effects_item: cn('flex flex-col w-full gap-y-[8px]'),
      image_author_wrapper: cn('flex flex-col justify-start items-start w-full'),
      aside_search_wrapper: cn(
        'flex justify-center w-full items-center px-[10px] py-[20px] bg-aside-bg-top gap-x-[16px]',
      ),
      aside_search_inner: cn('flex justify-center items-center w-full relative'),
      aside_control_wrapper: cn(
        'flex justify-center w-full items-center gap-x-[16px] w-full py-[14px] px-[12px] bg-aside-control-bg',
      ),
      defense_aside_control_inner: cn('flex justify-center items-center gap-x-[12px] w-full'),
      weapons_aside_control_inner: cn('flex justify-center items-center gap-x-[15px] w-full'),
      zone_aside_control_inner: cn('flex justify-center items-center gap-x-[16px] w-full'),
      aside_elements_control_wrapper: cn('flex flex-col w-full py-[32px] gap-y-[8px]'),
      loader_wrapper: cn('w-full h-full flex justify-center items-center'),
      page_li_wrapper: cn('w-full h-full bg-page-li-bg nth-of-type-[2n]:bg-accordion-bg'),
      input_search_button_wrapper: cn('relative w-[24px] h-[24px]'),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface AtomWrapperProps extends React.ComponentProps<'div'> {
  variant?: VariantProps<typeof variants>['variant']
  asChild?: boolean
  style?: React.CSSProperties
}

export const AtomWrapper = ({
  children,
  variant = 'default',
  className,
  asChild = false,
  style,
  ...props
}: AtomWrapperProps) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component className={cn(variants({ variant, className }))} {...props} style={style}>
      {children}
    </Component>
  )
}
