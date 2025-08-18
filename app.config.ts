export default defineAppConfig({
    ui: {
      colors: {
        primary: 'sky',
        neutral: 'zinc',
        error: 'red',
        success: 'green'
      },
      container: {
        base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8'
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
        base: 'focus-visible:outline-primary text-decoration-underline',
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
      separator: {
        slots: {
          root: 'flex items-center align-center text-center',
          border: '',
          container: 'font-medium text-default flex',
          icon: 'shrink-0 size-5',
          avatar: 'shrink-0',
          avatarSize: '2xs',
          label: 'text-sm'
        },
        variants: {
          color: {
            primary: {
              border: 'border-primary'
            },
            secondary: {
              border: 'border-secondary'
            },
            success: {
              border: 'border-success'
            },
            info: {
              border: 'border-info'
            },
            warning: {
              border: 'border-warning'
            },
            error: {
              border: 'border-error'
            },
            neutral: {
              border: 'border-default'
            }
          },
          orientation: {
            horizontal: {
              root: 'w-full flex-row',
              border: 'w-full',
              container: 'mx-3 whitespace-nowrap'
            },
            vertical: {
              root: 'h-full flex-col',
              border: 'h-full',
              container: 'my-2'
            }
          },
          size: {
            xs: '',
            sm: '',
            md: '',
            lg: '',
            xl: ''
          },
          type: {
            solid: {
              border: 'border-solid'
            },
            dashed: {
              border: 'border-dashed'
            },
            dotted: {
              border: 'border-dotted'
            }
          }
        },
        compoundVariants: [
          {
            orientation: 'horizontal',
            size: 'xs',
            class: {
              border: 'border-t'
            }
          },
          {
            orientation: 'horizontal',
            size: 'sm',
            class: {
              border: 'border-t-[2px]'
            }
          },
          {
            orientation: 'horizontal',
            size: 'md',
            class: {
              border: 'border-t-[3px]'
            }
          },
          {
            orientation: 'horizontal',
            size: 'lg',
            class: {
              border: 'border-t-[4px]'
            }
          },
          {
            orientation: 'horizontal',
            size: 'xl',
            class: {
              border: 'border-t-[5px]'
            }
          },
          {
            orientation: 'vertical',
            size: 'xs',
            class: {
              border: 'border-s'
            }
          },
          {
            orientation: 'vertical',
            size: 'sm',
            class: {
              border: 'border-s-[2px]'
            }
          },
          {
            orientation: 'vertical',
            size: 'md',
            class: {
              border: 'border-s-[3px]'
            }
          },
          {
            orientation: 'vertical',
            size: 'lg',
            class: {
              border: 'border-s-[4px]'
            }
          },
          {
            orientation: 'vertical',
            size: 'xl',
            class: {
              border: 'border-s-[5px]'
            }
          }
        ],
          defaultVariants: {
            color: 'neutral',
            size: 'xs',
            type: 'solid'
          }
        }
    }
  })