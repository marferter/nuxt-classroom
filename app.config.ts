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
        ],
      }   
    }
  })