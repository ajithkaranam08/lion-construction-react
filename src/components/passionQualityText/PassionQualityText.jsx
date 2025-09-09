import React from 'react';

const PassionQualityText = ({ className = '', variant = 'default', positioning = 'relative' }) => {
  const baseClassName = 'passion-quality-text';
  const variantClassName = variant === 'header' ? 'header-passion-quality' : 
                          variant === 'footer' ? 'footer-passion-quality' : '';
  
  return (
    <div className={`${baseClassName} ${variantClassName}`}>
      <span className="passion-at">passion at quality</span>
    </div>
  );
};

export default PassionQualityText;
