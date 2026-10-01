import { Icon } from '@/config/icon';

const AppIcon = ({
                     name,
                     className = "",
                     isStatic
                 }: Icon.Props) => {
    const url = `url(${Icon.registry[name]})`;

    return (
        <span className={'block ' + className}
              style={
                  isStatic
                      ? {
                          backgroundImage: url,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: 'contain'
                      }
                      : {
                          maskImage: url,
                          WebkitMaskImage: url,
                          maskRepeat: 'no-repeat',
                          WebkitMaskRepeat: 'no-repeat',
                          maskPosition: 'center',
                          WebkitMaskPosition: 'center',
                          maskSize: 'contain',
                          WebkitMaskSize: 'contain',
                          backgroundColor: 'currentColor'

                      }
              }
              aria-hidden="true"
        />
    );
};

export default AppIcon;