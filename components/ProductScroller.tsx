import React, { useEffect, useRef, useMemo } from 'react';
import { Product } from '../types';

interface ProductScrollerProps {
    products: Product[];
    direction: 'left' | 'right';
    onProductClick: (product: Product) => void;
}

const ProductScroller: React.FC<ProductScrollerProps> = ({ products, direction, onProductClick }) => {
    // 1. Create a base list that is long enough to fill wide screens, preventing gaps.
    const extendedProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        const desiredCount = 12; // Target minimum number of items to ensure the track is wide.
        const factor = Math.ceil(desiredCount / products.length);
        // Repeat the products array 'factor' times, but at least once.
        return Array(Math.max(1, factor)).fill(products).flat();
    }, [products]);

    // 2. Duplicate the extended list for the seamless animation technique.
    const scrollerContent = useMemo(() => [...extendedProducts, ...extendedProducts], [extendedProducts]);
    
    const scrollerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const track = trackRef.current;
        if (!scroller || !track || extendedProducts.length === 0) return;

        let pos = 0;
        let loopWidth = 0;
        const BASE_SPEED = 40; // Pixels per second
        const HOVER_SPEED = 8;
        let currentSpeed = BASE_SPEED;
        let targetSpeed = BASE_SPEED;
        let lastTime = performance.now();
        let animationFrameId: number;

        const measure = () => {
            if (!track) return;
            loopWidth = 0;
            // 3. Calculate loopWidth based on the extended (but not yet duplicated) list.
            const originalChildrenCount = extendedProducts.length;
            if (track.children.length > originalChildrenCount) {
                for (let i = 0; i < originalChildrenCount; i++) {
                    loopWidth += (track.children[i] as HTMLElement).offsetWidth;
                }
                const gap = parseInt(window.getComputedStyle(track).gap) || 32; // Corresponds to space-x-8
                loopWidth += (gap * originalChildrenCount);
            }
            // Set initial position for right-scrolling animation to avoid a starting gap.
            if (direction === 'right' && pos === 0) { 
                pos = -loopWidth;
            }
        };
        
        measure();

        const tick = (now: number) => {
            if (!track) return;
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            
            currentSpeed += (targetSpeed - currentSpeed) * 0.08; // Smooth speed transition

            if (direction === 'left') {
                pos -= currentSpeed * dt;
                if (pos <= -loopWidth) pos += loopWidth;
            } else { // direction === 'right'
                pos += currentSpeed * dt;
                if (pos >= 0) pos -= loopWidth;
            }
            
            track.style.transform = `translateX(${pos}px)`;
            animationFrameId = requestAnimationFrame(tick);
        };

        const handleMouseEnter = () => { targetSpeed = HOVER_SPEED; };
        const handleMouseLeave = () => { targetSpeed = BASE_SPEED; };

        scroller.addEventListener('mouseenter', handleMouseEnter);
        scroller.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', measure);

        animationFrameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (scroller) {
                scroller.removeEventListener('mouseenter', handleMouseEnter);
                scroller.removeEventListener('mouseleave', handleMouseLeave);
            }
            window.removeEventListener('resize', measure);
        };
    }, [extendedProducts, direction]);

    return (
        <div 
            ref={scrollerRef}
            className="w-full overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_24px,_black_calc(100%-24px),transparent_100%)]"
        >
            <div ref={trackRef} className="flex w-max space-x-8 px-4">
                {scrollerContent.map((product, index) => (
                    <li key={`${product.id}-${index}`} className="w-56 flex-shrink-0 list-none">
                        <button
                            onClick={() => onProductClick(product)}
                            className="block w-full bg-white rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 group shadow-lg hover:shadow-2xl"
                        >
                            <div className="h-32 p-3 flex items-center justify-center bg-gray-50 rounded-t-lg overflow-hidden">
                                <img 
                                    src={product.colors[0].mainImage} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-3">
                                <p className="font-semibold text-sm text-[#3A3F4F] truncate">{product.name}</p>
                                <p className="text-xs text-gray-500 truncate">{product.tagline}</p>
                                <p className="font-bold text-base text-[#4A4A4A] mt-1">${product.price.toFixed(2)}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default ProductScroller;