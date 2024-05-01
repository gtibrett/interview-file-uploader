import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import * as React from 'react';
import {forwardRef} from 'react';

const LinkBehavior = forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => <NextLink ref={ref} {...props} />);

export default LinkBehavior;