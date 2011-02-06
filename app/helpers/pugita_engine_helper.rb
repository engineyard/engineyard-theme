module PugitaEngineHelper
  def pugita_header
    additional_header = block_given? ? yield : ''
    render :partial => 'pugita/header', :locals => {
      :additional_header => additional_header
    }
  end
  
  def pugita_footer
    additional_footer = block_given? ? yield : ''
    render :partial => 'pugita/footer', :locals => {
      :additional_footer => additional_footer
    }
  end
end