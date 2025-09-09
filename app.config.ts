export default defineAppConfig({
    ui: {
      colors: {
        primary: 'sky',
        neutral: 'zinc',
        error: 'red',
        success: 'green'
      },
      container: {
        base: 'w-full max-w-(--ui-container) mx-auto px-6 sm:px-6 lg:px-8'
      },
      card: {
        slots: {
          root: 'rounded-lg',
          header: 'p-4 sm:px-6 font-bold text-xl',
          body: 'p-4 sm:p-6',
          footer: 'p-4 sm:px-6'
        },
        variants: {
          variant: {
            solid: {
              root: 'bg-inverted text-inverted'
            },
            outline: {
              root: 'bg-default ring ring-default divide-y divide-default'
            },
            soft: {
              root: 'bg-elevated/50 divide-y divide-default'
            },
            subtle: {
              root: 'bg-elevated/50 ring ring-default divide-y divide-default'
            }
          }
        },
        defaultVariants: {
          variant: 'outline'
        }
      },
      link: {
        base: 'focus-visible:outline-primary underline text-primary',
        variants: {
          active: {
            true: 'text-primary',
            false: 'text-muted'
          },
          disabled: {
            true: 'cursor-not-allowed opacity-75'
          }
        },
      },
      navigationMenu: {
      slots: {
        link: 'group relative w-full flex items-center gap-1.5 font-medium text-md before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        linkLeadingIcon: 'shrink-0 size-5',
        childList: 'isolate',
        childLabel: 'text-md text-highlighted',
        childItem: '',
        childLink: 'group relative size-full flex items-start text-start text-md before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        separator: 'px-2 h-px bg-border',
      },
      variants: {
        color: {
          primary: {
            link: 'focus-visible:before:ring-primary',
            childLink: 'focus-visible:before:ring-primary'
          },
        },
        orientation: {
          horizontal: {
            root: 'items-center justify-between',
            list: 'flex items-center',
            item: 'py-2',
            link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
            childList: 'grid p-2',
            childLink: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0',
            childLinkLabel: 'font-medium',
            content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto'
          },
          vertical: {
            root: 'flex-col',
            link: 'flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0',
            childLabel: 'px-1.5 py-0.5',
            childLink: 'p-1.5 gap-1.5 before:inset-y-px before:inset-x-0'
          }
        },
        contentOrientation: {
          horizontal: {
            viewportWrapper: 'justify-center',
            content: 'data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]'
          },
          vertical: {
            viewport: 'sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)'
          }
        },
        active: {
          true: {
            childLink: 'before:bg-elevated text-highlighted',
            childLinkIcon: 'text-default'
          },
          false: {
            link: 'text-muted',
            linkLeadingIcon: 'text-dimmed',
            childLink: [
              'hover:before:bg-elevated/50 text-default hover:text-highlighted',
              'transition-colors before:transition-colors'
            ],
            childLinkIcon: [
              'text-dimmed group-hover:text-default',
              'transition-colors'
            ]
          }
        },
        disabled: {
          true: {
            link: 'cursor-not-allowed opacity-75'
          }
        },
        highlight: {
          true: ''
        },
        level: {
          true: ''
        },
        collapsed: {
          true: ''
        }
      },
      defaultVariants: {
        color: 'primary',
        highlightColor: 'primary',
        variant: 'pill'
    }
  },
  radioGroup: {
    compoundVariants: [
          {
            size: 'xs',
            variant: [
              'card',
              'table'
            ],
            class: {
              item: 'p-1.5'
            }
          },
          {
            size: 'sm',
            variant: [
              'card',
              'table'
            ],
            class: {
              item: 'p-3'
            }
          },
          {
            size: 'md',
            variant: [
              'card',
              'table'
            ],
            class: {
              item: 'p-3.5'
            }
          },
          {
            size: 'lg',
            variant: [
              'card',
              'table'
            ],
            class: {
              item: 'p-4'
            }
          },
          {
            size: 'xl',
            variant: [
              'card',
              'table'
            ],
            class: {
              item: 'p-4.5'
            }
          },
          {
            color: 'primary',
            variant: 'card',
            class: {
              item: 'has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary'
            }
          }
        ]
      }
    }
  })